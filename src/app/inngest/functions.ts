import {inngest} from "@/inngest/client";
import {generateText} from "ai";
import {google} from "@ai-sdk/google";


export const demoGenerate = inngest.createFunction(
    {id: "demo-generate"},
    {event: "demo/generate"},
    async ({event, step}) => {
        await step.run("generate-text", async () => {
            await generateText({
                model: google('gemini-2.0-flash'),
                prompt: "Write a vegetarian lasagna recipe for 4 people.",
            });
        });
        return {message: `Hello ${event.data.email}!`};
    },
);