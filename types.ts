export type QuestionType = 'MCQ' | 'TF' | 'SA';
export type DifficultyLevel = 'NB' | 'TH' | 'VD';
export type ModelType = 'gemini-2.5-flash' | 'gemini-3-pro-preview';

export interface TopicPlan {
  id: string;
  topic: string;
  type: QuestionType;
  count: number;
  level: DifficultyLevel;
}

export interface ExamConfig {
  grade: string;
  subject: string; // Defaults to Math but can be flexible
  model: ModelType;
  outputFormat: 'latex' | 'word';
}

export interface GeneratedExam {
  content: string;
  timestamp: string;
  counts: {
    MCQ: number;
    TF: number;
    SA: number;
  };
}

export const QUESTION_TYPES: Record<QuestionType, string> = {
  MCQ: 'Trắc nghiệm (TNKQ)',
  TF: 'Đúng/Sai (Đ/S)',
  SA: 'Trả lời ngắn (TL)'
};

export const DIFFICULTY_LEVELS: Record<DifficultyLevel, string> = {
  NB: 'Nhận biết',
  TH: 'Thông hiểu',
  VD: 'Vận dụng'
};

// Legacy types for compatibility with unused components
export enum Topic {
  ARITHMETIC = 'Số học',
  ALGEBRA = 'Đại số',
  GEOMETRY = 'Hình học',
  CALCULUS = 'Giải tích',
  STATISTICS = 'Thống kê'
}

export type Difficulty = DifficultyLevel;

export interface MathProblem {
  id: string;
  topic: Topic;
  difficulty: Difficulty;
  question: string;
  hint: string;
}

export interface SolutionResult {
  isCorrect: boolean;
  explanation: string;
  correction?: string;
}