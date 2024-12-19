document.addEventListener('DOMContentLoaded', () => {
    // 첫 번째 페이지 기능

    // 지원사업 사례 펼치고 접기
    const toggleButton = document.getElementById('toggleButton');
    const casesDiv = document.getElementById('cases');
    const closeButton = document.getElementById('closeButton');

    toggleButton.addEventListener('click', () => {
        casesDiv.style.display = 'block'; // 펼치기
    });

    closeButton.addEventListener('click', () => {
        casesDiv.style.display = 'none';  // 접기
    });

    // 각 사례별 마우스 오버시 스타일 변경
    const cases = document.querySelectorAll('.case');

    cases.forEach(singleCase => {
        singleCase.addEventListener('mouseover', () => {
            singleCase.style.backgroundColor = 'rgba(94, 144, 94, 0.08)'; // 배경색 변경
            singleCase.style.color = '#00796b'; // 텍스트 색상 변경
        });

        singleCase.addEventListener('mouseout', () => {
            singleCase.style.backgroundColor = ''; // 원래 배경색으로 복원
            singleCase.style.color = ''; // 원래 텍스트 색상으로 복원
        });
    });

    // 위기아동지원 사업에 관한 의견 댓글 달기
    const commentInput = document.getElementById("commentInput");
    const submitCommentButton = document.getElementById("submitButton");
    const commentList = document.getElementById("commentList");

    // 댓글 추가 함수
    function addComment() {
        const commentText = commentInput.value.trim();

        // 댓글이 비어있지 않으면
        if (commentText) {
            const commentDiv = document.createElement("div");
            commentDiv.classList.add("comment");
            commentDiv.textContent = commentText;

            // 댓글 리스트에 댓글 추가
            commentList.appendChild(commentDiv);

            // 입력 필드 초기화
            commentInput.value = "";
        } else {
            alert("댓글을 입력해주세요."); // 빈 댓글에 대한 경고
        }
    }

    // 버튼 클릭 시 댓글 추가
    submitCommentButton.addEventListener("click", addComment);

    // Enter 키 누를 시 댓글 추가
    commentInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // 기본 엔터 키 동작 방지
            addComment(); // 댓글 추가 함수 호출
        }
    });
});

// 두 번째 페이지 기능
const donationForm = document.querySelector('form'); // 폼 엘리먼트 선택
const cancelButton = document.getElementById('cancelButton');

// 전화번호 유효성 검사
const phoneInput = document.getElementById('phone');
const feedback1Div = document.getElementById('feedback1');
const phonePattern = /^(010)-\d{4}-\d{4}$/; // 정규 표현식

// 입력 필드에 입력할 때마다 유효성 검사 수행
phoneInput.addEventListener('input', () => {
    // 사용자 입력의 유효성 검사
    if (phonePattern.test(phoneInput.value)) {
        feedback1Div.textContent = "유효한 전화번호 형식입니다."; // 유효할 때의 피드백
        feedback1Div.style.color = "green"; // 글자 색상 변경
    } else {
        feedback1Div.textContent = "잘못된 전화번호 형식입니다. 예: 010-1234-5678"; // 유효하지 않을 때의 피드백
        feedback1Div.style.color = "red"; // 글자 색상 변경
    }
});

// 결제방식 선택에 따라 텍스트 피드백 제공
const feedback2Div = document.querySelector('#feedback2')
const payRadios = document.querySelectorAll('[name=how]')

payRadios.forEach((radio) => {
    radio.addEventListener('change', (event) => {
        const current = event.currentTarget
        if (current.checked) {
            feedback2Div.textContent = `💲 ${current.value} 방식을 선택하셨습니다.`
        }
    })
})

if (donationForm) {
    donationForm.addEventListener('submit', (event) => {
        event.preventDefault(); // 기본 제출 동작 방지

        if (!phonePattern.test(phoneInput.value)) {
            alert("전화번호가 유효하지 않습니다."); // 실패 시 알림
            return; // 제출 중단
        }

        // 사용자 입력 값 가져오기
        const name = document.getElementById('name').value;
        const method = document.querySelector('input[name="method"]:checked');
        const amount = document.getElementById('amount').value;

        // 입력 값 확인 및 피드백
        if (!method) {
            alert("후원 방식을 선택해 주세요.");
        } else {
            alert(`${name}님, 감사합니다. ${amount}원 ${method.nextElementSibling.textContent}으로 선택하셨습니다.`); // 선택 정보 표시
        }
    });

    // 후원 금액 선택 변화에 대한 이벤트
    const amountSelect = document.getElementById('amount');
    amountSelect.addEventListener('change', () => {
        alert(`후원 금액이 ${amountSelect.value}원으로 변경되었습니다.`); // 변경 알림
    });
}

// 취소 버튼 클릭 시 입력값 및 피드백 초기화
if (cancelButton) {
    cancelButton.addEventListener('click', () => {
        // 입력 필드 초기화
        donationForm.reset();
        // 피드백 메시지 초기화
        feedback1Div.textContent = ""; // 전화번호 피드백 초기화
        feedback2Div.textContent = ""; // 결제방식 피드백 초기화
    });
}