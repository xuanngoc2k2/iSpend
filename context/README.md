# Codebase Context & Navigation

> AI dùng folder này để hiểu codebase.

---

## 🌟 Primary: Code-Review-Graph (MCP — Khuyên dùng)

Knowledge Graph tự động. AI dùng qua MCP tools, không cần đọc file thủ công.

```bash
# Cài đặt (1 lần duy nhất)
pip install code-review-graph && code-review-graph install

# Build lần đầu (~10 giây)
code-review-graph build

# Update (tự động qua git hook, hoặc thủ công)
code-review-graph update

# Xem trạng thái graph
code-review-graph status

# Vẽ sơ đồ tương tác
code-review-graph visualize
```

### MCP Tools (AI tự dùng):
| Tool | Chức năng |
|------|----------|
| `get_minimal_context_tool` | Lấy đúng files cần thiết cho task |
| `get_impact_radius_tool` | Khi sửa file A, biết file nào bị ảnh hưởng |
| `get_architecture_overview_tool` | Kiến trúc tổng quan |
| `semantic_search_nodes_tool` | Tìm function/class theo tên |
| `get_hub_nodes_tool` | God Nodes — file lõi hệ thống |
| `get_surprising_connections_tool` | Dependency bất thường |

---

## Config
- `.mcp.json` — MCP server config cho code-review-graph
