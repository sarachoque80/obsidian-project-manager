export function validateProjectName(name: string): { valid: boolean; error?: string } {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: 'Project name is required' };
  }

  if (name.length > 100) {
    return { valid: false, error: 'Project name must be less than 100 characters' };
  }

  return { valid: true };
}

export function validateProjectDuration(days: number): { valid: boolean; error?: string } {
  if (isNaN(days) || days <= 0) {
    return { valid: false, error: 'Duration must be a positive number' };
  }

  if (days > 365) {
    return { valid: false, error: 'Duration must be less than 365 days' };
  }

  return { valid: true };
}

export function validateURL(url: string): { valid: boolean; error?: string } {
  if (!url || url.trim().length === 0) {
    return { valid: false, error: 'URL is required' };
  }

  try {
    new URL(url);
    return { valid: true };
  } catch {
    return { valid: false, error: 'Invalid URL format' };
  }
}

export function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email || email.trim().length === 0) {
    return { valid: false, error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' };
  }

  return { valid: true };
}
