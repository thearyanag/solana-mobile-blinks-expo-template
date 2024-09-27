import { useQuery } from '@tanstack/react-query';

interface Action {
  actionUrl: string;
  blinkUrl: string;
  websiteUrl: string;
  createdAt: string;
  tags: string[];
  // Add other properties as needed
}


const fetchActionRegistry = async (): Promise<Action[]> => {
  const response = await fetch('https://registry.dial.to/v1/list');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.results;
};

export function useActionRegistry() {
  return useQuery<Action[], Error>({
    queryKey: ['actionRegistry'],
    queryFn: fetchActionRegistry,
  });
}