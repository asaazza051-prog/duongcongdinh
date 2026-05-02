import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, email, message } = body;

        // 1. Kiểm tra dữ liệu trống (Empty Body / Missing Fields)
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Vui lòng nhập đầy đủ tất cả các trường bắt buộc." },
                { status: 400 }
            );
        }

        // 2. Kiểm tra độ dài (Field Limits)
        if (name.length > 100) {
            return NextResponse.json({ error: "Tên quá dài (tối đa 100 ký tự)." }, { status: 400 });
        }
        if (message.length > 5000) {
            return NextResponse.json({ error: "Thông điệp quá dài (tối đa 5000 ký tự)." }, { status: 400 });
        }

        // 3. Kiểm tra định dạng Email (Invalid Data Type)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Định dạng email không hợp lệ." }, { status: 400 });
        }

        // 4. Kiểm tra ký tự đặc biệt nguy hiểm (XSS/Injection protection)
        const illegalChars = /[<>]/;
        if (illegalChars.test(name) || illegalChars.test(message)) {
            return NextResponse.json({ error: "Dữ liệu chứa ký tự không hợp lệ." }, { status: 400 });
        }

        // Nếu mọi thứ OK, ở đây bạn có thể tích hợp gửi Email qua Nodemailer hoặc các dịch vụ khác ở phía Server.
        // Hiện tại để đơn giản và tương thích với EmailJS của bạn, chúng ta chỉ trả về thành công 
        // để Frontend tiếp tục bước gửi email hoặc xử lý logic.
        
        return NextResponse.json({ success: true, message: "Dữ liệu hợp lệ." }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Lỗi hệ thống khi xử lý yêu cầu." }, { status: 500 });
    }
}
