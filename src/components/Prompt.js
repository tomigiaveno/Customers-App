import { unstable_usePrompt } from 'react-router-dom';

const Prompt = ({ when, message }) => {
  unstable_usePrompt(when, message);
  return null;
};

export default Prompt;