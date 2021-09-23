// notificationだと名前が重複するため
declare type Notify = {
    id?: number,
    visitor_id?: number,
    visited_id?: number,
    meeting_id?: number,
    report_id?: number,
    action?: string,
    created_at?: Date,
    updated_at?: Date,
}
