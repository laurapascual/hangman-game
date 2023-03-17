import '../styles/Loading.scss';

const Loading = ({ isLoading }) => {
  return isLoading ? <span className="loading"></span> : null;
};

export default Loading;
