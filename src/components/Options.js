const Options = ({handleChange, word}) => {
    const handleSubmit = (ev) => {
        ev.preventDefault();
    };

  return (
    <form onSubmit={handleSubmit}>
        <label className="title" htmlFor="word">
            Escribe aquí la palabra que hay que adivinar:
        </label>
        <input
            autofocus
            autocomplete="off"
            className="form__input"
            maxlength="15"
            type="text"
            id="word"
            name="word"
            value={word}
            onChange={handleChange}
        />
    </form>
  );
};

export default Options;