package com.researchlens.researchlens_backend;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class AIService {

    private final ChatClient chatClient;

    public AIService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    public String generateResponse(String prompt) {

        return chatClient.prompt()
                .user(prompt)
                .call()
                .content();
    }
}