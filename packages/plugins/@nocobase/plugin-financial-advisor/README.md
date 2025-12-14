# Financial Advisor Agent Plugin

This plugin adds a **PDF Extraction** workflow node and a **Financial Statements** collection to help you build an AI Financial Advisor agent.

## Features

1.  **PDF Extract Node:** Extracts text from PDF files (e.g., bank statements).
2.  **Financial Statements Collection:** A pre-defined collection to store statements and AI advice.

## Setup Guide

To create your AI Financial Advisor Agent:

1.  **Install the Plugin:** Enable `Financial Advisor Agent` in the NocoBase Plugin Manager.
2.  **Configure LLM:** Ensure you have the `@nocobase/plugin-ai` plugin enabled and an LLM service (e.g., OpenAI, Anthropic) configured.
3.  **Create a Workflow:**
    *   **Trigger:** "On Record Create" (Collection: `Financial Statements`)
    *   **Node 1: PDF Extract**
        *   File Field: `{{ $context.data.statement_file }}`
    *   **Node 2: LLM (AI)**
        *   Prompt:
            ```
            You are a financial advisor. Analyze the following bank statement text and provide budgeting advice and categorization of expenses.

            Bank: {{ $context.data.bank_name }}
            Statement Text:
            {{ $jobsMapByNodeKey.n1.text }}
            ```
            *(Note: Replace `n1` with the actual key of your PDF Extract node)*
    *   **Node 3: Update Record**
        *   Target: Current Record
        *   Fields:
            *   `Extracted Text`: `{{ $jobsMapByNodeKey.n1.text }}`
            *   `AI Advice`: `{{ $jobsMapByNodeKey.n2.content }}`

## Usage

1.  Go to the "Financial Statements" menu.
2.  Add a new record, select the Bank, and upload the PDF statement.
3.  The Workflow will run in the background. Refresh the page to see the Extracted Text and AI Advice.
