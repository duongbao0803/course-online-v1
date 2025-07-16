import axiosClient from '@/configs/axiosClient';

const getAll = () => {
  return axiosClient.get(`/course`);
};

const getDetail = (courseId: string) => {
  return axiosClient.post(`/course/${courseId}`);
};

export { getAll, getDetail };
