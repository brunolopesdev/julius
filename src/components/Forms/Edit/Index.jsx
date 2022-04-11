import "../Index.scss";
import { Button } from "../../Button/Index";
import { useFormik } from "formik";
import { collection, updateDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useParams } from "react-router-dom";

export const Edit = () => {
  const { id } = useParams();
  const transactionRef = collection(db, "transactions");

  const onSubmit = async (values) => {
    const { ...data } = values;
    const transactionDoc = doc(db, "transactions", id);

    await updateDoc(transactionDoc, values);
  };

  const formik = useFormik({
    initialValues: {
      valor: "",
      descricao: "",
      conta: "",
      data: "",
    },
    validateOnBlur: true,
    onSubmit,
  });

  return (
    <>
      <section className="event__container">
        <h1 className="edit__text">Editar gasto</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="field__container">
            <label>Conta</label>
            <input
              type="text"
              placeholder="Conta"
              name="conta"
              required
              value={formik.values.conta}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="field__container">
            <label>Descrição</label>
            <input
              type="text"
              placeholder="Descrição"
              name="descricao"
              required
              value={formik.values.descricao}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="field__container">
            <label>Valor gasto</label>
            <input
              type="number"
              placeholder="Valor"
              name="valor"
              required
              value={formik.values.valor}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="field__container">
            <label>Data</label>
            <input
              type="date"
              placeholder="Data"
              name="data"
              required
              value={formik.values.data}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <Button className="submit__button" text="Enviar" type="submit" />
        </form>
      </section>
    </>
  );
};
