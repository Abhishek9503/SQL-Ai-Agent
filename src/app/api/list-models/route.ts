interface ModelInfo {
    name: string;
    displayName: string;
    description: string;
    supportedGenerationMethods: string[];
}

export async function GET() {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
        return Response.json({ error: 'API key not found' }, { status: 500 });
    }

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
        );

        const data = await response.json() as { models?: ModelInfo[] };

        return Response.json({
            models: data.models?.map((model) => ({
                name: model.name,
                displayName: model.displayName,
                description: model.description,
                supportedGenerationMethods: model.supportedGenerationMethods,
            })) || [],
            fullResponse: data
        });
    } catch (error) {
        return Response.json({ error: String(error) }, { status: 500 });
    }
}
