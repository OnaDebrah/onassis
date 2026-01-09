import React from 'react'
import Firecrawl from "@mendable/firecrawl-js";

export const firecrawl = new Firecrawl({
   apiKey: process.env.FIREBASE_API_KEY,
});