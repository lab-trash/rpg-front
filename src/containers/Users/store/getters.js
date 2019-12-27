import User from '@/entities/User';

const user = state => state.user;
const isAuthenticated = state => state.user instanceof User;

export default {
  user,
  isAuthenticated,
};
