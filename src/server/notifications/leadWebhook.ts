/**
 * GuHomes Instant Architect Lead Webhook Notification System.
 * 
 * Supports:
 * - Generic JSON Webhook (CRM, Slack, Discord, Zapier, Make) via LEAD_WEBHOOK_URL
 * - Telegram Bot Instant Alert via TELEGRAM_BOT_TOKEN & TELEGRAM_CHAT_ID
 * - Fallback Structured Logger for DevOps & monitoring
 * 
 * Reliability guarantees:
 * - Always non-blocking (times out after 3.5s).
 * - Errors never bubble up or block database writes or customer confirmation.
 */

export interface LeadPayload {
  id?: string | null
  name: string
  email: string
  phone: string | null
  projectType: string | null
  budget: string | null
  message: string
  source: string
  createdAt?: string
}

export async function dispatchLeadNotification(lead: LeadPayload): Promise<void> {
  const tasks: Promise<unknown>[] = []

  const formattedTime = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })

  // 1. Telegram Bot Notification
  const tgToken = process.env.TELEGRAM_BOT_TOKEN
  const tgChatId = process.env.TELEGRAM_CHAT_ID

  if (tgToken && tgChatId) {
    const text = [
      `🏛 *GUHOMES — YÊU CẦU TƯ VẤN MỚI*`,
      `━━━━━━━━━━━━━━━━━━`,
      `👤 *Khách hàng:* ${escapeTg(lead.name)}`,
      `📞 *Hotline / Zalo:* \`${escapeTg(lead.phone ?? 'Chưa cung cấp')}\``,
      `✉️ *Email:* ${escapeTg(lead.email)}`,
      `📐 *Loại công trình:* ${escapeTg(lead.projectType ?? 'Chưa xác định')}`,
      `💰 *Ngân sách dự kiến:* ${escapeTg(lead.budget ?? 'Chưa xác định')}`,
      `📍 *Nguồn:* \`${escapeTg(lead.source)}\``,
      `⏱ *Thời gian:* ${escapeTg(formattedTime)}`,
      `━━━━━━━━━━━━━━━━━━`,
      `📝 *Nội dung yêu cầu:*`,
      `${escapeTg(lead.message)}`,
    ].join('\n')

    tasks.push(
      fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: tgChatId,
          text,
          parse_mode: 'Markdown',
        }),
        signal: AbortSignal.timeout(3500),
      }).catch((err) => {
        console.warn('[webhook/telegram] failed to send lead alert:', err?.message || err)
      }),
    )
  }

  // 2. Generic HTTP Webhook (CRM / Zapier / Make / Discord / Slack)
  const webhookUrl = process.env.LEAD_WEBHOOK_URL
  if (webhookUrl) {
    tasks.push(
      fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-GuHomes-Event': 'lead.created',
        },
        body: JSON.stringify({
          event: 'lead.created',
          timestamp: new Date().toISOString(),
          lead: {
            ...lead,
            formattedTime,
          },
        }),
        signal: AbortSignal.timeout(3500),
      }).catch((err) => {
        console.warn('[webhook/custom] failed to send lead alert:', err?.message || err)
      }),
    )
  }

  // 3. Fallback High-Visibility Console Log for Local Dev / Audits
  console.log(
    `[LEAD-DISPATCH-NOTIFICATION] [${formattedTime}] New lead from ${lead.name} (${lead.phone ?? lead.email}) - Type: ${lead.projectType ?? 'N/A'} - Source: ${lead.source}`,
  )

  if (tasks.length > 0) {
    await Promise.allSettled(tasks)
  }
}

function escapeTg(str: string): string {
  return str.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&')
}
