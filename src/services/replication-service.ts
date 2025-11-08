export function validateTradePayload(payload: any): boolean {
  return (
    payload &&
    typeof payload.symbol === 'string' &&
    typeof payload.side === 'string' &&
    typeof payload.qty === 'number'
  );
}
