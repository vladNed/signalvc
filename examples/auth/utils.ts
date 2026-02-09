import { resolveMx } from 'dns';

export function checkEmail(email: string): Promise<boolean> {
  return new Promise((resolve) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) resolve(false);

    resolveMx(email.split('@')[1], (err, addresses) => {
      if (err || !addresses || addresses.length === 0) resolve(false);
      resolve(true);
    });
  });
}
