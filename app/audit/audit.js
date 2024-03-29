'use client'
import React from 'react'
import { useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useStateValue } from '@/context/StateProvider';


function Auditing({
    audits,
    setAudits,
    total,
    setTotal,
    myPower,
    setMyPower,
  }) {
    const [{audit,}, dispatch] = useStateValue()
    


    const [auditEquipment, setAuditEquipment] = useState("");
    const [auditRating, setAuditRating] = useState("");
    const [auditHours, setAuditHours] = useState("");
    const [auditQuantity, setAuditQuantity] = useState("");
    const [auditTotalPower, setAuditTotalPower] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const id = audits.length ? audits[audits.length - 1].id + 1 : 1;
      const newAudit = {
        id,
        equipment: auditEquipment,
        rating: auditRating,
        quantity: auditQuantity,
        totalPower: auditTotalPower,
        dailyUsage: auditHours,
        dailyEnergy: total,
      };
      dispatch({
        type:'ADD_TO_AUDIT',
        payload: {
          id:newAudit.id,
          equipment: newAudit.equipment,
          rating: newAudit.rating,
          quantity: newAudit.quantity,
          totalPower: newAudit.totalPower,
          dailyUsage: newAudit.dailyUsage,
          dailyEnergy: newAudit.dailyEnergy,
          
        },
      })
      const allAudit = [...audits, newAudit];
      setAudits(allAudit);
      setAuditEquipment("");
      setAuditHours("");
      setAuditRating("");
      setAuditQuantity("");
    };
    let sum = 0;
    let equ = 0;
    console.log(audit)
    useEffect(() => {
        const handleAudit = () => {
          const eachAudit = audits.map(
            (audit) => audit.rating * audit.dailyUsage * audit.quantity,
          );
          let add = 0;
          for (let i = 0; i < eachAudit.length; i++) {
            add += eachAudit[i];
          }
          sum = add;
          setTotal(sum);
    
          const eachpower = audits.map((audit) => audit.rating * audit.quantity);
          let num = 0;
          for (let i = 0; i < eachpower.length; i++) {
            num += eachpower[i];
          }
          equ = num;
          setMyPower(equ);
        };
    
        handleAudit();
      }, [audits]);
    
      const handleHour = (e) => {
        setAuditHours(e.target.value);
        setAuditTotalPower(auditRating * auditQuantity);
      };
      const handleDelete = (id) => {
        const newList = audits.filter((audit) => audit.id !== id);
        setAudits(newList);

        dispatch({
          type: 'REMOVE_FROM_AUDIT',
          payload: id
          
      })
      };
      const handleSelect = (event) => {
        setAuditRating(event.target.value);
        setAuditEquipment(event.target.options[event.target.selectedIndex].text)
      };
    
      function createData(
        id,
        equipment,
        rating,
        quantity,
        totalPower,
        dailyUsage,
        dailyEnergy,
      ) {
        return {
          id,
          equipment,
          rating,
          quantity,
          totalPower,
          dailyUsage,
          dailyEnergy,
        };
      }
    
      const rows = audits.map((audit) =>
        createData(
          audit.id,
          audit.equipment,
          audit.rating,
          audit.quantity,
          audit.totalPower,
          audit.dailyUsage,
          audit.equipment ? audit.rating * audit.quantity * audit.dailyUsage : "",
        ),
      );
    
  return (
    <div className="houseAudit flex justify-center z-[1]">
    <div className=" bg-black bg-opacity-[0.04] h-auto md:w-auto w-[90%] flex flex-col p-8 rounded-3xl">
      <form className="inputs mb-3" onSubmit={handleSubmit}>
        {/* <input
        className='h-7 border-0 mr-3 rounded-xl pl-3 mb-1'
          type="text"
          placeholder="Equipment"
          value={auditEquipment}
          required
          onChange={(e) => setAuditEquipment(e.target.value)}
        /> */}
        <select name="equipment" id="equipment" className='h-7 border-0 mr-3 rounded-xl pl-3 mb-1' onChange={handleSelect}>
          <option value="">--Equipments--</option>
          <option value="10">Bulb</option>
          <option value="45">Fan</option>
          <option value="150">TV</option>
          <option value="65">Laptop</option>
          <option value="30">Phone</option>
          <option value="960">Microwave</option>
          <option value="2000">Electric Iron</option>
          <option value="300">Fridge</option>
          <option value="600">Blender</option>
          <option value="2000">Pumping Machine</option>
        </select>
        <input
        className='h-7 border-0 mr-3 rounded-xl pl-3 mb-1'
          type="number"
          placeholder="Rating(Watt)"
          value={auditRating} watts
          required
          onChange={(e) => setAuditRating(e.target.value)}
          min="1"
        />
        <input
        className='h-7 border-0 mr-3 rounded-xl pl-3 mb-1'
          type="number"
          placeholder="Quantity"
          value={auditQuantity}
          required
          onChange={(e) => setAuditQuantity(e.target.value)}
          min="1"
        />
        <input
        className='h-7 border-0 mr-3 rounded-xl pl-3 mb-1'
          type="number"
          placeholder="Daily Usage(Hour)"
          value={auditHours}
          required
          onChange={handleHour}
          min="1"
          max="24.00000000000"
        />

        <Fab
          type="submit"
          style={{
            backgroundColor: "#0c6525",
            color: "white",
          }}
          size="small"
          aria-label="add"
          className='z-[1]'
        >
          <AddIcon />
        </Fab>
      </form>
  

      <TableContainer component={Paper} style={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: "auto" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Equipment</b>
              </TableCell>
              <TableCell align="right">
                <b>Rating(W)</b>
              </TableCell>
              <TableCell align="right">
                <b>Quantity</b>
              </TableCell>
              <TableCell align="right">
                <b>Total Power(W)</b>
              </TableCell>
              <TableCell align="right">
                <b>Daily Usage(hr)</b>
              </TableCell>
              <TableCell align="right">
                <b>Daily Energy(W/hr)</b>
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.equipment}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.equipment}
                </TableCell>
                <TableCell align="center">{row.rating}</TableCell>
                <TableCell align="center">{row.quantity}</TableCell>
                <TableCell align="center">{row.totalPower}</TableCell>
                <TableCell align="center">{row.dailyUsage}</TableCell>
                <TableCell align="center">{row.dailyEnergy}</TableCell>
                <TableCell align="center">
                  <IconButton
                    align="center"
                    size="large"
                    aria-label="delete"
                    onClick={() => handleDelete(row.id)}
                  >
                    <DeleteIcon style={{ color: "#d62828" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={2}>{`Total power: ${myPower} W`}</TableCell>
              <TableCell
                align="center"
                colSpan={4}
              >{`Your daily energy consumpution is: ${total}Wh`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {/* <button  onClick={handleAudit} >Audit</button> */}
    </div>
  </div>
  )
}

export default Auditing
