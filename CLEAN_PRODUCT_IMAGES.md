---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3046022100a83e889501771dc3b2eaa06ed7be579a594b217e1dbfa41874138b19541c7026022100b3412ada6e5e61e21a54eba8986247e0a4b662ff05f3e5d4ed1dfe1ef3e35ecb
    ReservedCode2: 3046022100f64e240a693a363793f5e5a60104f399239eaa61a5498971af44ca396918f23702210086de9261ca0ae8fe3ef0cf420acfb3fa0c5d6bf6128a48357cef20afc56771ab
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
