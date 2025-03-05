import React from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic, Timeline } from "antd";
import DashboardLayout from "../../layout/DashboardLayout";
import LineChart from "./Line";

export const Dashboard = () => {
  return (
    <DashboardLayout>
      <Row gutter={12}>
        <Col span={6}>
          <Card variant="borderless" style={{ borderRadius: "15px" }}>
            <Statistic
              title="Active"
              value={11.28}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant="borderless" style={{ borderRadius: "15px" }}>
            <Statistic
              title="Idle"
              value={9.3}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant="borderless" style={{ borderRadius: "15px" }}>
            <Statistic
              title="Idle"
              value={9.3}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant="borderless" style={{ borderRadius: "15px" }}>
            <Statistic
              title="Idle"
              value={9.3}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={40}>
        <Col span={18}>
          <LineChart />
        </Col>
        <Row
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <Timeline
            items={[
              {
                children: "Create a services site 2015-09-01",
              },
              {
                children: "Solve initial network problems 2015-09-01",
              },
              {
                children: "Technical testing 2015-09-01",
              },
              {
                children: "Network problems being solved 2015-09-01",
              },
              {
                children: "Create a services site 2015-09-01",
              },
              {
                children: "Solve initial network problems 2015-09-01",
              },
              {
                children: "Technical testing 2015-09-01",
              },
              {
                children: "Network problems being solved 2015-09-01",
              },
              {
                children: "Create a services site 2015-09-01",
              },
              {
                children: "Solve initial network problems 2015-09-01",
              },
            ]}
          />
        </Row>
      </Row>
    </DashboardLayout>
  );
};
