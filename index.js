const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// 초기 게시글 데이터
let posts = [
    {
        id: 1,
        displayId: 1,
        subject: "subject-1",
        desc: "desc-1",
        createdAt: "2025-08-01",
        status: "draft",
    },
    {
        id: 2,
        displayId: 2,
        subject: "subject-2",
        desc: "desc-2",
        createdAt: "2025-08-01",
        status: "published",
    },
    {
        id: 3,
        displayId: 3,
        subject: "subject-3",
        desc: "desc-3",
        createdAt: "2025-08-01",
        status: "archived",
    }
];

let initId = 4;

// ✅ [POST] 게시글 생성
app.post('/posts', (req, res) => {
    try {
        const { subject, desc } = req.body;

        if (typeof subject !== 'string' || subject.trim() === '' ||
            typeof desc !== 'string' || desc.trim() === '') {
            return res.status(400).json({ message: "subject, desc는 비어있지 않아야 합니다." });
        }

        const newPost = {
            id: initId++,
            displayId: posts.length + 1,
            subject: subject.trim(),
            desc: desc.trim(),
            createdAt: new Date().toISOString(),
            status: "draft"
        };

        posts.push(newPost);
        res.status(201).json({ message: "게시글 생성 완료", post: newPost });

    } catch (error) {
        console.error("게시글 생성 중 오류", error);
        res.status(500).json({ message: "서버 오류" });
    }
});

// ✅ [GET] 전체 게시글 조회
app.get("/posts", (req, res) => {
    res.status(200).json({
        message: "전체 게시글 목록",
        posts
    });
});

// ✅ [GET] 게시글 1개 조회
app.get("/post/:id", (req, res) => {
    try {
        const postId = Number(req.params.id);
        const post = posts.find(p => p.id === postId);

        if (!post) {
            return res.status(404).json({ message: "해당 게시글을 찾을 수 없습니다." });
        }

        res.status(200).json({
            message: "게시글 1개 불러오기 완료",
            post
        });
    } catch (error) {
        console.error("게시글 조회 중 오류", error);
        res.status(500).json({ message: "서버 오류" });
    }
});

// ✅ [PUT] 게시글 전체 수정
app.put("/post/:id", (req, res) => {
    try {
        const postId = Number(req.params.id);
        const index = posts.findIndex(p => p.id === postId);

        if (index === -1) {
            return res.status(404).json({ message: "해당 게시글을 찾을 수 없습니다." });
        }

        const { subject, desc, status } = req.body;

        if (
            typeof subject !== 'string' || subject.trim() === '' ||
            typeof desc !== 'string' || desc.trim() === '' ||
            !['draft', 'published', 'archived'].includes(status)
        ) {
            return res.status(400).json({ message: "입력값이 유효하지 않습니다." });
        }

        posts[index] = {
            ...posts[index],
            subject: subject.trim(),
            desc: desc.trim(),
            status
        };

        res.status(200).json({
            message: "게시글 수정 완료",
            post: posts[index]
        });

    } catch (error) {
        console.error("게시글 수정 중 오류", error);
        res.status(500).json({ message: "서버 오류" });
    }
});

// ✅ [DELETE] 게시글 삭제
app.delete('/posts/:id', (req, res) => {
    try {
        const postId = Number(req.params.id);
        const index = posts.findIndex(p => p.id === postId);

        if (index === -1) {
            return res.status(404).json({ message: "게시글 없음" });
        }

        posts.splice(index, 1);

        return res.status(200).json({ message: "게시글 삭제 완료" });

    } catch (error) {
        console.error("게시글 삭제 중 오류", error);
        res.status(500).json({ message: "서버 오류" });
    }
});

// ✅ 기본 루트
app.get("/", (req, res) => {
    res.send("hi");
});

// ✅ 서버 실행
app.listen(PORT, () => {
    console.log("server is running...");
});