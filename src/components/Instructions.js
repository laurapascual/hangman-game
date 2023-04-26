import '../styles/Instructions.scss';

const Instructions = () => {
  return (
    <section className="instructions">
        <p>
            Este juego consiste en adivinar la palabra que genera automáticamente la página web. Los aciertos hacen que la letra se agregue en los espacios correctos de la palabra o frase. Las opciones incorrectas agregan piezas a la horca y al ahorcado. Las letras incorrectas se muestran en la sección "letras fallidas".
        </p>
        <p>
            En el apartado "más opciones" encontrarás la posibilidad de añadir la palabra que quieres que otras personas adivinen o ver la solución de la palabra actual.
        </p>
</section>
  );
};

export default Instructions;