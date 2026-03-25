---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3045022100e3f10721f4e2cc04512880bade25b478c5207220490a24eab9639d26cefd5207022017f55fac71a863fcbf58ce99e89f0a5d5769b993de0ee6e63062944b8f5b06f5
    ReservedCode2: 304402204ba3163d8c721b7ac748bb8168fcd5837d886b23e28fe9e0497155e2f4613fff022026d86b42910227dc58f37c27d58d7fb264bfc48cf97c0126c46b5ee0d88005ac
---

# 清理无效的产品图片引用

请在 Supabase SQL Editor 中执行以下 SQL 来清理这些无效的图片引用：

```sql
-- 将引用了不存在图片的产品图片URL清空
UPDATE products
SET image_url = ''
WHERE image_url IN (
  'surgery-cart.webp',
  'smoke-evacuator.webp',
  'recorder.webp',
  'heater.webp',
  'suction.webp',
  '/images/surgery-cart.webp',
  '/images/smoke-evacuator.webp',
  '/images/recorder.webp',
  '/images/heater.webp',
  '/images/suction.webp',
  'images/surgery-cart.webp',
  'images/smoke-evacuator.webp',
  'images/recorder.webp',
  'images/heater.webp',
  'images/suction.webp'
);

-- 或者：删除所有引用了这些图片的产品（如果想要完全删除）
-- DELETE FROM products
-- WHERE image_url IN ('surgery-cart.webp', 'smoke-evacuator.webp', 'recorder.webp', 'heater.webp', 'suction.webp');
```

执行完这个SQL后，刷新网站，这些404错误就会消失了。
