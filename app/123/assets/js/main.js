document.addEventListener('DOMContentLoaded', () => {
    const feedbackFirst = document.getElementById('feedback-first');
   
    const messageFirst = document.getElementById('message-first');

    feedbackFirst.addEventListener('submit', (e) => {
        e.preventDefault();

        (async () => {
            const rawResponse = await fetch(`${window.location.origin}/server/feedback.php`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: e.target[0].value,
                    phone: e.target[1].value
                })
            });
            const content = await rawResponse.json();

            if (content.status === true) {
                document.location.href = '/success.html';
            } else {
                messageFirst.innerHTML = content.message;
            }
        })();
    });
});