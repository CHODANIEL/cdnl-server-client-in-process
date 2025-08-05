const express = require("express")
const router = express.Router()

router.post('/',(req,res)=>{
    res.send("사용자 등록 완료")
})
router.get('/',(req,res)=>{
    res.send("사용자 전체 목록")
})

router.get('/:id',(req,res)=>{
    const id=req.params.id
    res.send(`사용자 1명 목록 :${id}`)
})

router.put('/:id',(req,res)=>{
    const id=req.params.id
    res.send(`사용자 1명 수정 :${id}`)
})
router.delete('/:id',(req,res)=>{
    const id=req.params.id
    res.send(`사용자 1명 삭제 :${id}`)
})

module.exports=router