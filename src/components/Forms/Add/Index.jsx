import "../Index.scss";
import { useState } from "react";
import { Button } from "../../Button/Index";
import { useFormik } from "formik";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import { Sucess } from "../../Sucess/Index";
import { useAuth } from "../../../context/AuthContext";

export const Add = () => {
  const { currentUser } = useAuth();
  const transactioCollectionRef = collection(db, "transactions");
  const [sucess, setSucess] = useState(null);
  const [error, setError] = useState(null);
  const userId = 1;

  const onSubmit = async (values) => {
    const { ...data } = values;

    try {
      await addDoc(transactioCollectionRef, values);
      setSucess(true);
    } catch (error) {
      setError(true);
    }
  };

  const formik = useFormik({
    initialValues: {
      valor: "",
      descricao: "",
      conta: "",
      data: "",
      forma: "",
      id: currentUser.uid,
    },
    validateOnBlur: true,
    onSubmit,
  });

  return (
    <>
      {sucess ? (
        <Sucess />
      ) : (
        <section className="event__container">
          <h1 className="add__text">Adicionar gasto</h1>

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
              <label>Forma de pagamento</label>
              <input
                type="text"
                placeholder="Cartão/Vr"
                name="forma"
                required
                value={formik.values.forma}
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
      )}
    </>
  );
};
