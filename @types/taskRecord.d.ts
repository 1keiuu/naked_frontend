//識別子が重複するのでTaskRecordとする
declare type TaskRecord = {
    id: number,
    task_id: number,
    user_id: number,
    sub_task_id: number,
    starts_time: Date,
    finish_time: Date,
    created_at?: Date,
    updated_at?: Date,
}
