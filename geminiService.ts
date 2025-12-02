import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Difficulty, Topic, MathProblem, SolutionResult } from "./types";

// Initialize Gemini Client
// CRITICAL: Using strict process.env.API_KEY as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelId = "gemini-2.5-flash";

/**
 * Generates a math problem based on topic and difficulty.
 */
export const generateProblem = async (topic: Topic, difficulty: Difficulty): Promise<MathProblem> => {
  const prompt = `Tạo một bài toán ${topic} với độ khó ${difficulty}. 
  Hãy chắc chắn rằng câu hỏi rõ ràng và phù hợp với học sinh.
  Cung cấp một gợi ý nhỏ để giúp giải quyết vấn đề.`;

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      question: {
        type: Type.STRING,
        description: "Nội dung câu hỏi bài toán",
      },
      hint: {
        type: Type.STRING,
        description: "Một gợi ý ngắn gọn giúp người học giải bài toán",
      },
    },
    required: ["question", "hint"],
  };

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: "Bạn là một giáo viên toán học giỏi tiếng Việt. Hãy tạo ra các bài tập thú vị.",
      },
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No response from Gemini");

    const data = JSON.parse(jsonText);
    
    return {
      id: Date.now().toString(),
      topic,
      difficulty,
      question: data.question,
      hint: data.hint,
    };
  } catch (error) {
    console.error("Error generating problem:", error);
    // Fallback in case of API error
    return {
      id: "error",
      topic,
      difficulty,
      question: "Không thể tải bài tập lúc này. Vui lòng thử lại.",
      hint: "",
    };
  }
};

/**
 * Checks the user's solution.
 */
export const checkSolution = async (problem: string, userAnswer: string): Promise<SolutionResult> => {
  const prompt = `Câu hỏi: "${problem}"
  Câu trả lời của học sinh: "${userAnswer}"
  
  Hãy kiểm tra xem câu trả lời có đúng không. 
  1. Nếu đúng, giải thích ngắn gọn tại sao.
  2. Nếu sai, chỉ ra chỗ sai và đưa ra đáp án đúng kèm lời giải chi tiết từng bước.
  `;

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      isCorrect: {
        type: Type.BOOLEAN,
        description: "True nếu câu trả lời đúng, False nếu sai",
      },
      explanation: {
        type: Type.STRING,
        description: "Lời giải thích chi tiết và các bước giải",
      },
      correction: {
        type: Type.STRING,
        description: "Đáp án đúng ngắn gọn (nếu học sinh trả lời sai)",
      }
    },
    required: ["isCorrect", "explanation"],
  };

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: "Bạn là một gia sư toán tận tâm. Giải thích dễ hiểu, khuyến khích học sinh.",
      },
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No response text");

    return JSON.parse(jsonText) as SolutionResult;
  } catch (error) {
    console.error("Error checking solution:", error);
    return {
      isCorrect: false,
      explanation: "Đã xảy ra lỗi khi kiểm tra. Vui lòng thử lại.",
    };
  }
};