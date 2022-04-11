import "./style.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  limit,
  query,
  where,
} from "firebase/firestore";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";

export const Table = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [data, setData] = useState([]);
  const transactionRef = collection(db, "transactions");

  // query by id
  const deleteTransaction = async (id) => {
    const transactionDoc = doc(db, "transactions", id);

    await deleteDoc(transactionDoc);
    window.location.reload();
  };

  const getData = async () => {
    const dataByUser = query(
      transactionRef,
      where("id", "==", currentUser.uid)
    );
    const transactions = await getDocs(dataByUser);
    setData(transactions.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="table__container">
      <table className="table">
        <thead>
          <tr>
            <th>Conta</th>
            <th>Valor</th>
            <th>Descrição</th>
            <th>Data</th>
            <th>Editar/Deletar</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              <td data-label="Conta">{item.conta}</td>
              <td data-label="Valor">R$ {item.valor}</td>
              <td data-label="Descrição">{item.descricao}</td>
              <td data-label="Data">{item.data.replaceAll("-", "/")}</td>
              <td>
                <a
                  onClick={() => deleteTransaction(item.id)}
                  style={{
                    cursor: "pointer",
                    color: "#242424",
                    paddingRight: "10px",
                    fontSize: "20px",
                  }}
                >
                  <AiOutlineDelete />
                </a>
                <Link
                  to={`editar/${item.id}`}
                  style={{
                    cursor: "pointer",
                    color: "#7523e0",
                    fontSize: "20px",
                  }}
                >
                  <FiEdit2 />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export const TableLast = () => {
  const transactionRef = collection(db, "transactions");
  const [latestData, setLatestData] = useState([]);

  useEffect(() => {
    const getLatestData = async () => {
      const lastThree = query(transactionRef, limit(3));
      const latestTransactions = await getDocs(lastThree);

      setLatestData(
        latestTransactions.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    getLatestData();
  }, []);

  return (
    <main className="table__container">
      <table className="table">
        <thead>
          <tr>
            <th>Conta</th>
            <th>Valor</th>
            <th>Descrição</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {latestData?.map((item) => (
            <tr key={item.id}>
              <td data-label="Conta">{item.conta}</td>
              <td data-label="Valor">R$ {item.valor}</td>
              <td data-label="Descrição">{item.descricao}</td>
              <td data-label="Data">{item.data}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};
