interface ApiResponse<T = unknown> {
  code: string;
  message: string;
  data?: T;
  errors?: string[];
}

export default ApiResponse;
