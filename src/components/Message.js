const Message = ({handleReset}) => {
    return (
    <div className="message">
      <p>¡Enhorabuena, has ganado!</p>
      <button onClick={handleReset}>Volver a jugar</button>
    </div>
  );
}

export default Message;