const scalarTest = async (mongo) => {
  const people = await mongo
    .db("document_db")
    .collection("people")
    .findOne({ age: 32 });
};

export default scalarTest;
