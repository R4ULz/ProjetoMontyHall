import { useEffect, useState } from "react";
import Porta from "../../../../components/Porta";
import styles from "../../../styles/Jogo.module.css";
import { atualizarPortas, criarPortas } from "../../../../functions/portas";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Jogo() {
  const router = useRouter();

  const [portas, setPortas] = useState([]);
  const [valido, setValido] = useState(false);


  useEffect(() => {
    const portas = +router.query.portas;
    const temPresente = +router.query.temPresente;
    const qtdePortasValidas = portas >= 3 && portas <= 10
    const temPresenteValido = temPresente >= 1 && temPresente <= portas

    setValido(qtdePortasValidas && temPresenteValido)
  }, [portas, router.query.portas, router.query.temPresente]);

  useEffect(() => {
    const portas = +router.query.portas;
    const temPresente = +router.query.temPresente;
    setPortas(criarPortas(portas, temPresente));
  }, [router?.query]);

  function renderizarPortas() {
    return valido && portas.map((porta) => {
      return (
        <Porta
          key={porta.numero}
          value={porta}
          onChange={(novaPorta) => {
            setPortas(atualizarPortas(portas, novaPorta));
          }}
        />
      );
    });
  }

  return (
    <div id={styles.jogo}>
      <div className={styles.portas}>
        {valido ? renderizarPortas(): 
        <h2>Valores Inválidos</h2> 
        }
        </div>
      <div className={styles.botoes}>
        <Link href="/">
          <button>Reiniciar Jogo</button>
        </Link>
      </div>
    </div>
  );
}
