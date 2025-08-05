const express = require("express");
const app = express();
const PORT = 3000;

// 요청 본문 JSON 파싱
app.use(express.json());

// 라우터 마운트
const bookRoutes = require("./routes/books");
app.use("/books", bookRoutes);

// 루트 경로
app.get("/", (req, res) => {
    res.send("Hello, RESTful API!");
});

app.listen(PORT, () => {
    console.log(`📚 Book API Server is running at http://localhost:${PORT}`);
});
const express = require("express");
const router = express.Router();

// 메모리 데이터
let books = [
    { id: 1, title: "javascript", auther: "김**" },
    { id: 2, title: "html", auther: "김**" },
    { id: 3, title: "css", auther: "김**" },
];
let initId = 4



module.exports = router

// 

router.get('/', (req, res) => {
    try {
        res.status(200).json({ message: "전체도서 가져오기", books })
    } catch (error) {
        console.error("전체 도서 가져오기 중 오류")
        res.status(500).json({ message: "서버오류" })
    }
})
