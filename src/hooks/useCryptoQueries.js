import { useQuery } from '@tanstack/react-query';
import { fetchTopCoins, fetchCoinDetails, fetchCoinHistory } from '../services/api';

export const useTopCoins = () => {
  return useQuery({
    queryKey: ['topCoins'],
    queryFn: fetchTopCoins,
    staleTime: 60 * 1000, // 1 minute cache
    refetchInterval: 60 * 1000, // Live poll every minute
  });
};

export const useCoinDetails = (id) => {
  return useQuery({
    queryKey: ['coinDetails', id],
    queryFn: () => fetchCoinDetails(id),
    enabled: Boolean(id),
    staleTime: 2 * 60 * 1000,
  });
};

export const useCoinHistory = (id, days = 7) => {
  return useQuery({
    queryKey: ['coinHistory', id, days],
    queryFn: () => fetchCoinHistory(id, days),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
  });
};
