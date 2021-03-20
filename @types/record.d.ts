//識別子が重複するのでTaskRecordとする
declare type TaskRecord = {
    id: number,
    task_id: number,
    user_id: number,
    sub_task_id: number,
    starts_time: Date,
    finish_time: Date,
    title?: string,
    description?: string,
    status?: string,
    starts_date?: string,
    due_date?: string
    completed_date?: string,
    created_at?: Date,
    updated_at?: Date,
}
