interface ApiError {
  code: string;
  message: string;
  errors?: string[];
}

export default ApiError;
