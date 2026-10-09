"use client";

import { useOrder } from "@/components/orders/OrderProvider";
import { Container } from "@/components/ui/Container";
import { formatPrice } from "@/lib/format";
import { orderStatusLabels } from "@/patterns/behavioral/order-state";

export function AdminOrders() {
  const { orders, hydrated } = useOrder();

  return (
    <section className="py-14">
      <Container>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-ember">
          Administración
        </p>
        <h1 className="mt-2 font-display text-6xl leading-none text-cream">
          Pedidos
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          Consulta los pedidos realizados desde la web.
        </p>

        {!hydrated ? (
          <p className="mt-8 text-muted">Cargando pedidos...</p>
        ) : orders.length === 0 ? (
          <div className="mt-8 border-t border-cream/10 py-8">
            <p className="text-muted">Todavía no hay pedidos registrados.</p>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {orders.map((order) => (
              <article
                key={order.id}
                className="border border-cream/10 bg-card p-5 sm:p-6"
              >
                <header className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                      Número del pedido
                    </p>
                    <h2 className="mt-1 font-display text-3xl text-cream">
                      {order.id}
                    </h2>
                    <p className="mt-1 text-sm text-muted">
                      Cliente:{" "}
                      <span className="font-semibold text-cream">
                        {order.customer?.name || "No registrado"}
                      </span>
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      Celular:{" "}
                      <span className="font-semibold text-cream">
                        {order.customer?.phone || "No registrado"}
                      </span>
                    </p>
                    {order.fulfillmentType === "delivery" ? (
                      <>
                        <p className="mt-1 text-sm text-muted">
                          Distrito:{" "}
                          <span className="font-semibold text-cream">
                            {order.fulfillment?.district || "No registrado"}
                          </span>
                        </p>
                        <p className="mt-1 text-sm text-muted">
                          Dirección:{" "}
                          <span className="font-semibold text-cream">
                            {order.fulfillment?.address || "No registrado"}
                          </span>
                        </p>
                        <p className="mt-1 text-sm text-muted">
                          Referencia:{" "}
                          <span className="font-semibold text-cream">
                            {order.fulfillment?.reference || "No registrado"}
                          </span>
                        </p>
                      </>
                    ) : null}
                  </div>
                  <span className="rounded-full border border-gold/40 px-3 py-1 text-xs font-semibold text-gold">
                    {orderStatusLabels[order.status]}
                  </span>
                </header>

                <div className="mt-5 grid gap-5 border-t border-cream/10 pt-5 sm:grid-cols-[1fr_auto]">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                      Productos
                    </h3>
                    <ul className="mt-2 space-y-1 text-sm text-cream">
                      {order.items.map((item) => (
                        <li key={item.productId}>
                          {item.quantity} × {item.name}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm text-muted">
                      Modalidad:{" "}
                      <span className="font-semibold text-cream">
                        {order.fulfillmentType === "delivery"
                          ? "Delivery"
                          : "Recojo"}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-end justify-between gap-4 border-t border-cream/10 pt-4 sm:min-w-36 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
                    <span className="text-sm text-muted">Total</span>
                    <strong className="text-lg text-gold">
                      {formatPrice(order.total)}
                    </strong>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
