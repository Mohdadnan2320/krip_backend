const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.MY_TEST_KEY,
});

exports.generateSpecSheet = async (req, res) => {
  const inputData = req.body;
  console.log(inputData)
  try {

    const formattedInputs = Object.entries(inputData)
    .map(([key, value], index) => {
      const title = key
        .replace(/([A-Z])/g, " $1")       // camelCase to spaced
        .replace(/[_-]/g, " ")             // snake_case or kebab-case to space
        .replace(/\b\w/g, (l) => l.toUpperCase()); // capitalize
      const val = Array.isArray(value) ? value.join(", ") : value;
      return `**${index + 1}. ${title}**: ${val}`;
    })
    .join("\n");
    const prompt = `
You are a Senior Technical Strategist and Solution Architect.

Below are the client's selected requirements for a project. Based on these, generate a structured **Spec Sheet in JSON format** with the following keys:

- "serviceDetails": Object containing "service" (string) and "template" (string).
- "descriptive": A professional paragraph that summarizes the project scope and vision in a client-friendly tone.
- "tags": Array of keywords relevant to the project.
- "paymentOptions": Array of 3 options:
  1. 10% upfront, 40% midway, 50% on delivery — 5 Days
  2. 50% upfront, 50% on delivery — 3 Days
  3. 100% on delivery — 1 Day
  Each should include label, description, and estimated delivery.
- "selectedPaymentOption": (string) — Select one as default (you can choose based on complexity).
- "totalPrice": (string) — Choose a reasonable estimated price based on the project complexity. If advanced or enterprise-level features are present, increase accordingly (e.g., ₹20,000+).
- "estimatedTimeOfDelivery": (string) — Choose between 2–5 days based on complexity and payment.
- "orderDetails": Object with placeholders: "orderNumber", "orderDate", and "invoiceDetails".

Client Inputs:
${formattedInputs}

Please respond with only valid JSON.
`

    // const prompt = `
    // You are a Senior Technical Strategist and UI/UX Consultant.
    
    // Based on the client-provided details, generate a clear and structured Spec Sheet **in JSON format** with the following keys:
    
    // - "serviceDetails" (object): Includes "service" (string) and "template" (string).
    // - "descriptive" (string): A professional summary of the project that explains what the client wants, including tone and key highlights.
    // - "tags" (array of strings): Keywords related to the project.
    // - "paymentOptions" (array of objects): Each object should have "label" (string), "description" (string), and "estimatedDelivery" (string), using the following options:
    //     1. 10% upfront, 40% midway, 50% on delivery — 5 Days
    //     2. 50% upfront, 50% on delivery — 3 Days
    //     3. 100% on delivery — 1 Day
    // - "selectedPaymentOption" (string): One of the above options, chosen by the client.
    // - "totalPrice" (string): Default value: "Rs. 1000"
    // - "estimatedTimeOfDelivery" (string): Based on selected payment option.
    // - "orderDetails" (object): Includes placeholders for "orderNumber", "orderDate", and "invoiceDetails".
    
    // Client Inputs:
    // ${formattedInputs}
    
    // Please return only valid JSON.
    // `;
    
    

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert in generating structured Spec Sheets for projects.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });
    console.log(completion);
    res.status(201).json(completion.choices[0].message);
  } catch (error) {
    console.error("Error generating Spec Sheet:", error);
    res.status(500).json({ error: "Error generating Spec Sheet" });
  }
};

// `Generate a structured Spec Sheet based on the following details:
//           1. **Scope of Work**: ${scope}
//           2. **Project Description**: ${description}
//           3. **Estimated Budget**: ${budget}
//           4. **Checklist (5 Steps)**: ${checklist}
//           5. **Additional Requirements**: ${additional || "None"}

//           The output should include:
//           - A structured Spec Sheet with all requested details
//           - A loading message: "Generating Spec Sheet, please wait..."
//           - A Final Confirmation step where the user can either approve or request modifications.`



// const prompt = `
// You are a Senior Technical Architect and Business Strategist.

// Based on the following project details provided by a client, generate a **detailed, structured Spec Sheet** that includes:

// ---

// ### 📝 Client Inputs:
// ${formattedInputs}

// ---

// ### 🔧 Spec Sheet Requirements:
// 1. **Loading Message**: "Generating Spec Sheet, please wait..."
// 2. **Project Summary**: Describe what this project is about.
// 3. **Goals & Scope**: Outline what the project aims to achieve.
// 4. **Features Breakdown**: List of features grouped by modules (Frontend, Backend, Integrations, etc.)
// 5. **Technology Stack Recommendation**: Best-fit tech stack (Frontend, Backend, Database, AI/Chatbot, Hosting).
// 6. **Development Timeline & Cost Plans**:
//  - **Basic Plan**: Includes minimal viable product (MVP), price, and timeline
//  - **Pro Plan**: Includes core features + optimizations
//  - **Enterprise Plan**: Full-scale build, high scalability, advanced automation, maintenance, etc.
// 7. **Backend & Infra Strategy**: Scalable API structure, maintenance needs, performance tips.
// 8. **Expert Suggestions**: Based on inputs, suggest better approaches or improvements.
// 9. **Confirmation Message**: Ask user if they want to approve or request changes.

// Use professional and easy-to-read language. Format the output clearly for frontend rendering (sections or markdown-like style).
// `;


// const prompt = `
//     You are a Senior Technical Architect and Business Strategist.
    
//     Based on the following project details provided by a client, generate a detailed, structured Spec Sheet **in JSON format** with the following keys:
    
//     - "loadingMessage" (string): The loading message.
//     - "projectSummary" (string): A summary of what the project is about.
//     - "goalsScope" (array of strings): A list of goals and objectives.
//     - "features" (object): An object with keys such as "Frontend", "Backend", and "Integrations", each containing an object or array of feature details.
//     - "technologyStack" (object): Recommended technologies for categories like "Frontend", "Backend", "Database", "AIChatbot", and "Hosting".
//     - "plans" (array): An array of pricing plans where each plan is an object with "title", "description", "timeline", and "price".
//     - "backendInfraStrategy" (array of strings): Strategies for backend and infrastructure.
//     - "expertSuggestions" (array of strings): Expert suggestions for improvements.
//     - "confirmationMessage" (string): A message asking if the user wants to approve or request changes.
    
//     Client Inputs:
//     ${formattedInputs}
    
//     Please return only valid JSON.
//     `;