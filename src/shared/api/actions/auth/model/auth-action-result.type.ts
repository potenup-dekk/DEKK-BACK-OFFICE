interface AuthActionResult {
  isSuccess: boolean;
  message: string;
  code?: string;
}

export default AuthActionResult;