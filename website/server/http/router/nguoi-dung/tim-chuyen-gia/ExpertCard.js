import Template from 'server/lib/template-engine.js'

const Tag = new Template(`<span data-id="{{id}}" class="tag">{{name}}</span>`)
const Card = new Template(`<div class="expert-card">
    <img src="{{avatarUrl}}" alt="{{name}}" class="avatar">
    <h4 class="name">{{name}}</h4>
    <p class="specialty">{{specialty}}</p>
    <div class="expert-tags">
        {{tags}}
    </div>
    <div class="card-footer">
        <a href="/expert/{{id}}" class="card-btn btn-secondary">Xem hồ sơ</a>
        <a href="/expert/{{id}}/dat-lich" class="card-btn btn-primary">Đặt lịch ngay</a>
    </div>
</div>`)

export default {
    render(payload) {
        let data = { ...payload }
        data.tags = (payload.specialties || []).map(t => Tag.render(t))
        return Card.render(data)
    }
}