function NumberOfQuestions({ setNrQuestions }) {
  function handleSubmit(e) {
    console.log(e);
    e.preventDefault();
  }

  return (
    <form id="test-form">
      <input
        type="text"
        id="test"
        placeholder="Default is 5"
        name="numberOfQuestions"
        onChange={setNrQuestions}
        onSubmit={() => handleSubmit}
      />
    </form>
  );
}

export default NumberOfQuestions;
