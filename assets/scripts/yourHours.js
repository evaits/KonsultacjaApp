function createModal(date, time) {
    return modalCode = `
        <h2 class="modal_title">
        Nowe zgłoszenie
        </h2>
        <form method="get" class="form" id="form" action="">
        <textarea required name="theme" placeholder="Napisz temat oraz dodatkową informacje" id="theme"></textarea>
        <div class="info">
            <div class="content_info">
                <div class="info_text">
                    ${date}
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                    <rect x="1" y="2.79999" width="16" height="16.2" rx="2" stroke="#8F9BB3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12.556 1V4.6" stroke="#8F9BB3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M5.444 1V4.6" stroke="#8F9BB3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M1 8.20001H17" stroke="#8F9BB3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="content_info">
                <div class="info_text">
                    ${time}
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke="#8F9BB3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10.5558 4.60001V10L14.1558 11.8" stroke="#8F9BB3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        </div>
        <button class="modal_btn">Create Event</button>
    </form>
    `;
}