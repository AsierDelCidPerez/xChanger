import { Paper, Table, TableContainer, TableCell, TableHead, TableRow, TableBody, Button } from "@mui/material"

const resultados = [
    {
        origen: "PL1",
        destino: "PL4",
        ofertas: 5,
        lastId: "2355",
    },
    {
        origen: "PL3",
        destino: "PL2",
        ofertas: 5,
        lastId: "2355",
    },
    {
        origen: "PL1",
        destino: "PL3",
        ofertas: 5,
        lastId: "2355",
    },
    {
        origen: "PL3",
        destino: "PL1",
        ofertas: 5,
        lastId: "2355",
    },
    {
        origen: "PL1",
        destino: "PL4",
        ofertas: 5,
        lastId: "2355",
    }
]

const TablaOfertas = () => {

    const inscribirseAOferta = idOferta => () => {
        
    }

    return (
        <TableContainer component={Paper}>
            <Table>
        <TableHead>
          <TableRow>
            <TableCell>Origen de grupo</TableCell>
            <TableCell>Destino de grupo</TableCell>
            <TableCell>Número de ofertas</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {resultados.map((row,key) => (
                <TableRow
              key={key}
            >
              <TableCell>{row.origen}</TableCell>
              <TableCell>{row.destino}</TableCell>
              <TableCell>{row.ofertas}</TableCell>
              <TableCell><Button onClick={inscribirseAOferta(row.lastId)}>Inscribirme a la oferta</Button></TableCell>

            </TableRow>
            ))}
        </TableBody>
      </Table>
        </TableContainer>
    )
}

export default TablaOfertas