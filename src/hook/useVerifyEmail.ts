export const useVerifyEmail = () => {
  const email_re: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return {
    verifyEmail: (email: string) => email_re.test(email)
  }
};
