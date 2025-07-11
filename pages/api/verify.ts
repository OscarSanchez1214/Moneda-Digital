import { NextApiRequest, NextApiResponse } from 'next'
import { verifyCloudProof, ISuccessResult } from '@worldcoin/minikit-js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { payload, action, signal } = req.body
  const app_id = process.env.APP_ID as `app_${string}`

  const result = await verifyCloudProof(payload as ISuccessResult, app_id, action, signal)

  if (result.success) {
    return res.status(200).json({ status: 'ok' })
  } else {
    return res.status(400).json({ error: 'Verification failed', result })
  }
}
