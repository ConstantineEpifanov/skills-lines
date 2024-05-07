import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { blockActions } from '../store/lines/block.slice';
import { circlesActions } from '../store/lines/circles.slice';

const actions = {
  ...blockActions,
  ...circlesActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
