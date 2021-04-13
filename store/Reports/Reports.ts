import { reactive } from '@vue/composition-api'

export default function ReportsStore() {
  const state = reactive({
    reports: <Report[]>[],
  })

  const replaceReport = (reports: Report[], report: Report) => {
      let target = reports.find(item => { return item.id === report.id })
      if (target) {
        let i = reports.indexOf(target)
        reports.splice(i,1,report)
      }
  }

  return {
    get reports() {
      return state.reports
    },
    setReports(array:Report[]) {
      state.reports = array
    },
    appendReport(report: Report) {
      state.reports.push(report)
    },
    updateReport(report: Report) {
      replaceReport(state.reports,report)
    },
    deleteReports(payload: Number) {
      const target = state.reports.find((item:Report) => {
        return item.id == payload
      })
      if (target) {
        const targetIndex = state.reports.indexOf(target)
        state.reports.splice(targetIndex, 1)
      }
    },
  }
}

export type ReportsStore = ReturnType<typeof ReportsStore>;
