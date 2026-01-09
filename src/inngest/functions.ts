import {inngest} from "@/inngest/client";
import {generateText} from "ai";
import {google} from "@ai-sdk/google";
import {firecrawl} from "@/lib/firecrawl";

const URL_REGEX = /^https?:\/\/[^\s]+/g;

export const demoGenerate = inngest.createFunction(
    {id: "demo-generate"},
    {event: "demo/generate"},
    async ({event, step}) => {
        const {prompt} = event.data as { prompt: string };
        const urls = await step.run("extract-urls", async () => {
            return prompt.match(URL_REGEX) ?? [];
        }) as string[];

        const scrapedContent = await step.run("extract-urls", async () => {
            const result = await Promise.all(
                urls.map(async url => {
                    const result = await firecrawl.scrape(url,
                        {formats: ["markdown"]},
                    );
                    return result.markdown ?? null;
                })
            );
            return result.filter(Boolean).join("\n\n");
        });

        const finalPrompt = scrapedContent
            ? `Context:\n${scrapedContent}\n\nQuestion:${prompt}`
            : prompt;

        await step.run("generate-text", async () => {
            await generateText({
                model: google('gemini-2.0-flash'),
                prompt: finalPrompt,
            });
        });
        return {message: `Hello ${event.data.email}!`};
    },
);