import { response } from 'express';
import { pool } from '../database'
export const listarventas = async(req, res) => {
    try {
        const response = await pool.query("select v.fecha,v.numdoc,d.cantidad,d.total,p.nomprod,p.precio from venta v, detalle d , producto p where d.idventa = v.idventa and d.idproducto=p.idproducto");
  
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }


}

export const crearventa = async(req, res) => {


    try {
        const {venta,detalle} = req.body;
        const rest = await pool.query('insert into venta(fecha,tipodoc,numdoc) values($1,$2,$3) returning idventa', [venta.fecha, venta.tipodoc,venta.numdoc]);
        if(rest.rows[0].length!=0){
            const det= detalle.forEach(element => {
                pool.query('insert into detalle(idventa,idproducto,cantidad,total) values($1,$2,$3,$4)', [rest.rows[0].idventa,element.idproducto, element.cantidad,element.total]);
            });


        }else{
            res.status(500).json('Internal Server error...!');
        }
       
        return res.status(200).json(`Venta nro ${ venta.numdoc } creado correctamente...!`);

      
      
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }

}
export const modificarventa = async(req, res) => {

    try {
        const id = parseInt(req.params.id);
        const{ fecha, tipodoc,numdoc,idcliente,idusuario,idempleado} = req.body;
        await pool.query('update venta set fecha=$1, tipodoc=$2,numdoc=$3,idcliente=$4,idusuario=$5,idempleado=$6 where idventa=$7', [fecha, tipodoc,numdoc,idcliente,idusuario,idempleado, id]);
        return res.status(200).json(
            `Venta nro ${ numdoc } modificado correctamente...!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }

}
export const eliminarventa = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('delete from detalle where idventa=$1', [id]);
        const responseventa = await pool.query('delete from venta where idventa=$1', [id]);
        
    
        return res.status(200).json(
            `Venta ${id} eliminada correctamente...!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }


}
export const listarunaventa = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('select *from venta where idventa=$1', [id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }


}