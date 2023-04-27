import '../styles/Message.scss';

const Message = ({handleReset}) => {
    return (
    <div className="message">
      <p>¡Enhorabuena, has ganado!</p>
      <button className='message__btn' onClick={handleReset}>Volver a jugar</button>
    </div>
  );
}

export default Message;